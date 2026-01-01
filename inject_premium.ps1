
$root = "c:\Users\08llu\Desktop\Namerly\Namerly"
$files = Get-ChildItem -Path $root -Recurse -Filter "index.html"

foreach ($file in $files) {
    # Skip the root index.html or allow it? Root index is usually the landing page, might not need generator features.
    # Usernames/index.html is the main one.
    # Let's check if it's a generator page. Usually has "generate" button or something.
    # But safer to just add to all subfolder index.htmls excluding root if desired, or all.
    
    # Calculate relative path depth
    $relativePath = "assets/js/premium-features.js"
    $depth = ($file.FullName.Substring($root.Length).Split('\').Count) - 1
    
    if ($depth -eq 1) {
       $scriptPath = "../assets/js/premium-features.js"
    } elseif ($depth -eq 2) {
       $scriptPath = "../../assets/js/premium-features.js"
    } else {
       if ($file.DirectoryName -eq $root) {
          $scriptPath = "./assets/js/premium-features.js"
       } else {
          $scriptPath = "../assets/js/premium-features.js" # Fallback
       }
    }

    $content = Get-Content $file.FullName -Raw
    
    if ($content -match "premium-features.js") {
        Write-Host "Skipping $($file.FullName) - already has script"
        
        # FIX: Check if it is type="module", if not, update it.
        if ($content -notmatch 'type="module".*premium-features.js') {
             Write-Host "Updating to module: $($file.FullName)"
             $content = $content -replace '<script src="(.*)premium-features.js"></script>', '<script type="module" src="$1premium-features.js"></script>'
             Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        }
        continue
    }

    Write-Host "Updating $($file.FullName)"
    
    # Insert before closing body tag
    $closingBody = "</body>"
    $scriptTag = "<script type=`"module`" src=`"$scriptPath`"></script>`n"
    
    if ($content -match $closingBody) {
        $content = $content.Replace($closingBody, $scriptTag + $closingBody)
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    } else {
        Write-Warning "Could not find body tag in $($file.FullName)"
    }
}
