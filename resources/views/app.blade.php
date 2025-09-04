<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{  'Medine Steel Doors' }}</title>
        <meta name="description" content="{{ env('APP_DESCRIPTION', 'Medine Steel Doors offers premium door installation services, combining security, style, and durability. Specializing in steel doors, we provide high-quality solutions for homes and businesses.') }}">
        <link rel="icon" type="image/png" href="{{ asset('icon.jpeg') }}">
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet">
                <meta name="keywords" content="steel doors, iron doors, security doors, Egypt doors, custom metal doors, home security, entrance doors">
                <meta name="author" content="Medina Steel Doors">
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
