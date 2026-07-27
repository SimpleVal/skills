# Keep User-invoked Skills Visible in Kilo

Accepted. User-invoked skills use `policy.allow_implicit_invocation: false` but omit `disable-model-invocation: true`, because that flag also makes skills unavailable in Kilo's user-facing picker. This deliberately prioritizes deliberate user access over identical invocation metadata across harnesses; user-invoked skills may explicitly compose other skills through `/skill` instructions, and the repository invocation rules should reflect this policy.
