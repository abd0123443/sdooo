<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Search Engine Optimization Meta Tags -->
        <title>Medina Steel Doors | High-Qecurity Iron Doors </title>
        <meta name="description" content="Discover premium quality steel and iron doors from Medina Steel Doors. Custom designs, enhanced security features, and elegant solutions for homes and businesses in Egypt.">
        <meta name="keywords" content="steel doors, iron doors, security doors, Egypt doors, custom metal doors, home security, entrance doors">
        <meta name="author" content="Medina Steel Doors">

        <!-- Open Graph Meta Tags for Social Media -->
        <meta property="og:title" content="Medina Steel Doors | Premium Security Doors Egypt">
        <meta property="og:description" content High-quality custom steel and iron doors with enhanced security features for Egyptian homes and businesses.">
        <meta property="og:url" content="https://medinesteeldoor.com">
        <meta property="og:type" content="website">
        <meta property="og:image" content="{{ asset('images/og-image.jpg') }}">

        <!-- Twitter Card Meta Tags -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Medina Steel Doors | Premium Security Doors Egypt">
        <meta name="twitter:description" content="High-quality custom steel and iron doors with enhanced security features for Egyptian homes and businesses.">
        <meta name="twitter:image" content="{{ asset('images/twitter-image.jpg') }}">

        <!-- Structured Data for SEO -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "HomeAndConstructionBusiness",
          "name": "Medina Steel Doors",
          "description": "Manufacturer of high-quality security steel and iron doors in Egypt",
          "url": "https://medinesteeldoor.com",
          "telephone": "+20-XXX-XXX-XXXX",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Medina Street",
            "addressLocality": "Cairo",
            "addressCountry": "Egypt"
          },
          "openingHours": "Sat-Thu 09:00-18:00",
          "image": "https://medinesteeldoor.com/images/logo.jpg"
        }
        </script>

        <link rel="icon" type="image/png" href="{{ asset('icon.jpeg') }}">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
