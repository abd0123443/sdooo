<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Medina Steel Doors - Building Entrance Doors</title>
        <meta name="description" content="Medina Steel Doors provides secure, durable, and stylish entrance doors for residential and commercial buildings." />
        <meta name="keywords" content="building entrance doors, commercial steel doors, residential entrance doors, secure entry doors, Medina Steel Doors" />

        <!-- Favicon and Icons -->
        <link rel="icon" type="image/png" href="{{ asset('icon.jpeg') }}">
        <link rel="apple-touch-icon" href="{{ asset('icon.jpeg') }}">

        <!-- Google Site Verification -->
        <meta name="google-site-verification" content="lE4DeKO3BYNJYGI3H4RjYdk2Q2deCp-Vaz26F3mOunk" />

        <!-- Structured Data for Google -->
        <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Medina Steel Doors",
            "url": "https://medinesteeldoor.com",
            "logo": "https://medinesteeldoor.com/icon.jpeg",
            "description": "Medina Steel Doors provides secure, durable, and stylish entrance doors for residential and commercial buildings.",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "Egypt"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+20-100-000-0000",
                "contactType": "Customer service"
            }
        }
        </script>

        <!-- Open Graph Meta Tags for Social Media -->
        <meta property="og:type" content="website">
        <meta property="og:title" content="Medina Steel Doors - Building Entrance Doors">
        <meta property="og:description" content="Medina Steel Doors provides secure, durable, and stylish entrance doors for residential and commercial buildings.">
        <meta property="og:image" content="https://medinesteeldoor.com/icon.jpeg">
        <meta property="og:url" content="https://medinesteeldoor.com">
        <meta property="og:site_name" content="Medina Steel Doors">

        <!-- Twitter Card Meta Tags -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Medina Steel Doors">
        <meta name="twitter:description" content="Secure, durable, and stylish entrance doors for residential and commercial buildings">
        <meta name="twitter:image" content="https://medinesteeldoor.com/icon.jpeg">

        <!-- Author -->
        <meta name="author" content="Medina Steel Doors">

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
