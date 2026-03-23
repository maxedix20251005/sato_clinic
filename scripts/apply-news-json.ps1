param(
  [Parameter(Mandatory = $true)]
  [string]$JsonPath,
  [string]$RootPath = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path,
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

function Escape-Html {
  param([string]$Text)
  if ($null -eq $Text) { return "" }
  $s = [string]$Text
  $s = $s.Replace('&', '&amp;')
  $s = $s.Replace('<', '&lt;')
  $s = $s.Replace('>', '&gt;')
  $s = $s.Replace('"', '&quot;')
  return $s
}

function Get-DateStamp {
  param($Item)
  $dateJa = [string]$Item.date_ja
  $m = [regex]::Match($dateJa, '(\d{4})年\s*(\d{1,2})月\s*(\d{1,2})日')
  if ($m.Success) {
    $y = [int]$m.Groups[1].Value
    $mm = [int]$m.Groups[2].Value
    $d = [int]$m.Groups[3].Value
    return [DateTimeOffset]::new([DateTime]::new($y, $mm, $d, 0, 0, 0, [DateTimeKind]::Utc)).ToUnixTimeSeconds()
  }
  $dateEn = [string]$Item.date_en
  try { return [DateTimeOffset]::Parse($dateEn).ToUnixTimeSeconds() } catch { }
  return 0
}

function To-AnchorId {
  param([string]$Id)
  if ([string]::IsNullOrWhiteSpace($Id)) { return "news-item" }
  $clean = $Id -replace '[^A-Za-z0-9_-]', '-'
  if ($clean -notmatch '^[A-Za-z]') { $clean = "news-$clean" }
  return $clean
}

function Replace-MarkerBlock {
  param(
    [string]$InputText,
    [string]$StartMarker,
    [string]$EndMarker,
    [string]$Content,
    [string]$Label
  )
  $pattern = "(?s)($([regex]::Escape($StartMarker)))(.*?)($([regex]::Escape($EndMarker)))"
  $regex = [regex]::new($pattern)
  $m = $regex.Match($InputText)
  if (-not $m.Success) {
    throw "Marker block not found: $Label"
  }
  return $regex.Replace(
    $InputText,
    [System.Text.RegularExpressions.MatchEvaluator]{
      param($mx)
      return ($mx.Groups[1].Value + "`r`n" + $Content + "`r`n" + $mx.Groups[3].Value)
    },
    1
  )
}

if (-not (Test-Path $JsonPath)) {
  throw "JSON file not found: $JsonPath"
}

$jsonText = Get-Content -Raw -Path $JsonPath -Encoding UTF8
$data = $jsonText | ConvertFrom-Json
if ($null -eq $data.items -or $data.items.Count -eq 0) {
  throw "Invalid JSON format. 'items' is missing or empty."
}

$newsPath = Join-Path $RootPath "subpages/news.html"
$indexPath = Join-Path $RootPath "index.html"

if (-not (Test-Path $newsPath)) { throw "File not found: $newsPath" }
if (-not (Test-Path $indexPath)) { throw "File not found: $indexPath" }

$items = @($data.items | Where-Object { -not [string]::IsNullOrWhiteSpace([string]$_.id) })
if ($items.Count -eq 0) {
  throw "No valid items found in JSON."
}

$items = @($items | Sort-Object `
  @{ Expression = { Get-DateStamp $_ }; Descending = $true }, `
  @{ Expression = { [string]$_.id }; Descending = $false })

$newsItemsHtml = @()
foreach ($item in $items) {
  $anchorId = To-AnchorId ([string]$item.id)
  $id = Escape-Html $anchorId
  $dateJa = Escape-Html ([string]$item.date_ja)
  $titleJa = Escape-Html ([string]$item.title_ja)
  $titleEn = Escape-Html ([string]$item.title_en)
  $bodyJa = Escape-Html ([string]$item.body_ja)
  $bodyEn = Escape-Html ([string]$item.body_en)

  $newsItemsHtml += @"
                    <div class="news-archive-item" id="$id">
                        <div class="news-archive-date">$dateJa</div>
                        <h3 class="news-archive-title"><span class="lang-toggle lang-ja">$titleJa</span><span class="lang-toggle lang-en">$titleEn</span></h3>
                        <p><span class="lang-toggle lang-ja">$bodyJa</span><span class="lang-toggle lang-en">$bodyEn</span></p>
                    </div>
"@
}

$topItems = @($items | Select-Object -First 5)
$topListHtml = @("            <ul class=""news-list-simple"">")
foreach ($item in $topItems) {
  $anchorId = To-AnchorId ([string]$item.id)
  $id = Escape-Html $anchorId
  $titleJa = Escape-Html ([string]$item.title_ja)
  $titleEn = Escape-Html ([string]$item.title_en)
  $topListHtml += "              <li><a href=""subpages/news.html#$id""><span class=""lang-toggle lang-ja"">$titleJa</span><span class=""lang-toggle lang-en"">$titleEn</span></a></li>"
}
$topListHtml += "            </ul>"

$newsHtml = Get-Content -Raw -Path $newsPath -Encoding UTF8
$indexHtml = Get-Content -Raw -Path $indexPath -Encoding UTF8

$newsHtml = Replace-MarkerBlock -InputText $newsHtml `
  -StartMarker "<!-- NEWS_ARCHIVE_ITEMS_START -->" `
  -EndMarker "<!-- NEWS_ARCHIVE_ITEMS_END -->" `
  -Content ($newsItemsHtml -join "`r`n") `
  -Label "NEWS_ARCHIVE_ITEMS"

$indexHtml = Replace-MarkerBlock -InputText $indexHtml `
  -StartMarker "<!-- NEWS_TOP_LIST_START -->" `
  -EndMarker "<!-- NEWS_TOP_LIST_END -->" `
  -Content ($topListHtml -join "`r`n") `
  -Label "NEWS_TOP_LIST"

if ($DryRun) {
  Write-Output "DryRun: files were not written."
  Write-Output "Total items in JSON: $($items.Count)"
  Write-Output "Top items rendered: $($topItems.Count)"
  Write-Output "Targets:"
  Write-Output " - $newsPath"
  Write-Output " - $indexPath"
  exit 0
}

Set-Content -Path $newsPath -Value $newsHtml -Encoding utf8
Set-Content -Path $indexPath -Value $indexHtml -Encoding utf8

Write-Output "Applied JSON to:"
Write-Output " - $newsPath"
Write-Output " - $indexPath"
Write-Output "Total items rendered: $($items.Count)"
Write-Output "Top items rendered: $($topItems.Count)"
