<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Medina Steel Doors - Building Entrance Doors</title>
        <meta name="description" content="Medina Steel Doors provides secure, durable, and stylish entrance doors for residential and commercial buildings." />
        <meta name="keywords" content="building entrance doors, commercial steel doors, residential entrance doors, secure entry doors, Medina Steel Doors" />
        <link rel="icon" type="image/png" href="{{ asset('icon.jpeg') }}">
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet">
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
