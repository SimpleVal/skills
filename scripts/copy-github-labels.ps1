<#
.SYNOPSIS
    Copies GitHub labels from a source repository to all repositories in the same organization.
.DESCRIPTION
    Fetches labels from the source repo and replicates them to every other repo in the org.
    Existing labels on target repos are deleted before the source labels are recreated.
    Requires GitHub CLI (gh) installed and authenticated.
#>

param(
    [string]$OrgName    = "my-org",
    [string]$SourceRepo = "my-source-repo"
)

$ErrorActionPreference = "Stop"

if (!(Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Error "GitHub CLI (gh) is not installed or not in PATH."
    exit 1
}

gh auth status 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Error "Not authenticated with GitHub CLI. Run 'gh auth login' first."
    exit 1
}

Write-Host "Fetching labels from $OrgName/$SourceRepo ..."
$labelOutput = gh label list --repo "$OrgName/$SourceRepo" --json name,color,description --limit 200 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to fetch labels from $OrgName/$SourceRepo`: $labelOutput"
    exit 1
}
$sourceLabels = $labelOutput | ConvertFrom-Json
if (!$sourceLabels) {
    Write-Error "No labels found in $OrgName/$SourceRepo or failed to parse JSON."
    exit 1
}

Write-Host "Found $($sourceLabels.Count) labels in source repository."

Write-Host "Fetching repositories in $OrgName ..."
$repoOutput = gh repo list $OrgName --limit 1000 --json name 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to fetch repositories for organization $OrgName`: $repoOutput"
    exit 1
}
$repos = $repoOutput | ConvertFrom-Json
if (!$repos) {
    Write-Error "No repositories found in $OrgName or failed to parse JSON."
    exit 1
}

Write-Host "Found $($repos.Count) repositories in $OrgName.`n"

$dryRun = $false

$repos | ForEach-Object {
    $repoName = $_.name
    $fullRepo = "$OrgName/$repoName"

    if ($repoName -eq $SourceRepo) {
        Write-Host "[SKIP] $fullRepo (source repository)"
        return
    }

    Write-Host "`n--- Processing $fullRepo ---"

    $labelOutput = gh label list --repo $fullRepo --json name --limit 200 2>&1
    if ($LASTEXITCODE -eq 0 -and $labelOutput) {
        $existingLabels = $labelOutput | ConvertFrom-Json
        if ($existingLabels) {
            Write-Host "  Deleting $($existingLabels.Count) existing labels ..."
            foreach ($label in $existingLabels) {
                if ($dryRun) {
                    Write-Host "    [DRY RUN] Would delete '$($label.name)'"
                } else {
                    gh label delete $label.name --repo $fullRepo --yes 2>&1 | Out-Null
                }
            }
        }
    }

    Write-Host "  Creating $($sourceLabels.Count) labels from source ..."
    foreach ($label in $sourceLabels) {
        $desc = if ($label.description) { $label.description } else { "" }
        if ($dryRun) {
            Write-Host "    [DRY RUN] Would create '$($label.name)' (#$($label.color))"
        } else {
            $result = gh label create $label.name --repo $fullRepo --color $label.color --description $desc 2>&1
            if ($LASTEXITCODE -ne 0) {
                Write-Host "    [WARN] Failed to create '$($label.name)': $result"
            }
        }
    }

    Write-Host "  Done."
}

Write-Host "`nAll repositories processed."
