# Script para agregar Google Analytics a todas las páginas
$gaScript = @"

  <!-- Google Analytics 4 -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZCBGMRHJ21"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-ZCBGMRHJ21', {
      cookie_domain: 'namerlygenerator.netlify.app',
      custom_map: {'custom_parameter_1': 'page_category'}
    });
  </script>
"@

# Lista de páginas importantes a actualizar
$pages = @(
    "roasts\index.html",
    "tiktok\index.html", 
    "youtube\index.html",
    "whatsapp\index.html",
    "wifi\index.html",
    "pets\index.html",
    "sarcastic\index.html",
    "phrases\index.html",
    "pranks\index.html",
    "social-excuses\index.html"
)

Write-Host "🔧 Agregando Google Analytics a páginas..." -ForegroundColor Green

foreach ($page in $pages) {
    $filePath = $page
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        
        # Buscar si ya tiene GA4
        if ($content -notmatch "G-ZCBGMRHJ21") {
            # Buscar donde insertar (después del <head> o antes de </head>)
            if ($content -match "<link rel=`"stylesheet`".*?/>") {
                $content = $content -replace "(<link rel=`"stylesheet`".*?/>)", "`$1$gaScript"
                Set-Content $filePath -Value $content -Encoding UTF8
                Write-Host "✅ Actualizado: $page" -ForegroundColor Cyan
            }
            else {
                Write-Host "⚠️  No se pudo actualizar: $page" -ForegroundColor Yellow
            }
        }
        else {
            Write-Host "📊 Ya tiene GA4: $page" -ForegroundColor Gray
        }
    }
    else {
        Write-Host "❌ No existe: $page" -ForegroundColor Red
    }
}

Write-Host "🎉 Proceso completado!" -ForegroundColor Green
