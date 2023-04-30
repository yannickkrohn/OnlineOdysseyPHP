<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Scripts -->
        <script src="{{ asset('js/app.js') }}" defer></script>

        <!-- Styles -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    </head>
    <body class="loggedin">
        <div class="col-lg-8 mx-auto p-4 py-md-5">
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                        <svg class="logo" id="Ebene_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 941.53 350.71"><defs><style>.cls-1{fill:#ddd;}.cls-2{fill:url(#Unbenannter_Verlauf_46);}</style><linearGradient id="Unbenannter_Verlauf_46" x1="82.53" y1="256.53" x2="82.53" y2="105.29" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ddd"/><stop offset=".17" stop-color="#e2e2e2"/><stop offset=".39" stop-color="#f3f3f3"/><stop offset=".52" stop-color="#fff"/><stop offset=".57" stop-color="#f9f9f9"/><stop offset=".83" stop-color="#e4e4e4"/><stop offset="1" stop-color="#ddd"/></linearGradient></defs><g id="Ebene_2-2"><path class="cls-1" d="M0,86.21C0,31.36,28.9,.01,81.79,.01s81.79,31.35,81.79,86.2v178.28c0,54.86-28.9,86.2-81.79,86.2S0,319.35,0,264.5V86.21Zm53.88,181.71c0,24.49,10.78,33.79,27.92,33.79s27.92-9.31,27.92-33.79V82.79c0-24.49-10.78-33.8-27.92-33.8s-27.92,9.31-27.92,33.8v185.14Z"/></g><g id="Ebene_4"><path class="cls-2" d="M56.82,82.79c0-24.49,9.79-33.81,26.92-33.81,8.33,0,14.9,2.21,19.47,7.25h55.17C149.85,20.08,124.23,0,82.28,0,29.88,0,2.94,31.35,2.94,86.21c0,97.96,105.32,111.19,105.32,181.71,0,24.49-10.78,33.31-27.93,33.31-10.98,0-19.36-3.62-23.95-12.69H3.5c7.2,39.86,33.67,62.17,78.28,62.17,52.92,0,80.33-31.35,80.33-86.21,0-97.96-105.3-111.19-105.3-181.71Z"/></g><g id="Ebene_5"><g><path class="cls-1" d="M235.59,124.7c0-28.19,14.85-44.29,42.03-44.29s42.03,16.11,42.03,44.29v91.61c0,28.19-14.85,44.29-42.03,44.29s-42.03-16.11-42.03-44.29V124.7Zm27.68,93.37c0,12.58,5.54,17.36,14.35,17.36s14.35-4.78,14.35-17.36V122.94c0-12.58-5.54-17.36-14.35-17.36s-14.35,4.78-14.35,17.36v95.13Z"/><path class="cls-1" d="M343.81,82.42h43.79c27.68,0,41.27,15.35,41.27,43.54v89.09c0,28.19-13.59,43.54-41.27,43.54h-43.79V82.42Zm27.68,25.17v125.83h15.6c8.81,0,14.09-4.53,14.09-17.11V124.7c0-12.58-5.28-17.11-14.09-17.11h-15.6Z"/><path class="cls-1" d="M474.93,200.2l-34.98-117.78h28.94l21.14,80.28,21.14-80.28h26.42l-34.98,117.78v58.39h-27.68v-58.39Z"/><path class="cls-1" d="M590.45,80.41c26.93,0,40.77,16.11,40.77,44.29v5.54h-26.17v-7.3c0-12.58-5.03-17.36-13.84-17.36s-13.84,4.78-13.84,17.36c0,36.24,54.11,43.04,54.11,93.37,0,28.19-14.09,44.29-41.27,44.29s-41.27-16.11-41.27-44.29v-10.82h26.17v12.58c0,12.58,5.54,17.11,14.34,17.11s14.35-4.53,14.35-17.11c0-36.24-54.11-43.04-54.11-93.37,0-28.19,13.84-44.29,40.77-44.29Z"/><path class="cls-1" d="M690.87,80.41c26.93,0,40.77,16.11,40.77,44.29v5.54h-26.17v-7.3c0-12.58-5.03-17.36-13.84-17.36s-13.84,4.78-13.84,17.36c0,36.24,54.11,43.04,54.11,93.37,0,28.19-14.09,44.29-41.27,44.29s-41.27-16.11-41.27-44.29v-10.82h26.17v12.58c0,12.58,5.54,17.11,14.34,17.11s14.35-4.53,14.35-17.11c0-36.24-54.11-43.04-54.11-93.37,0-28.19,13.84-44.29,40.77-44.29Z"/><path class="cls-1" d="M781.72,156.66h38v25.17h-38v51.59h47.82v25.17h-75.5V82.42h75.5v25.17h-47.82v49.07Z"/><path class="cls-1" d="M878.87,200.2l-34.98-117.78h28.94l21.14,80.28,21.14-80.28h26.42l-34.98,117.78v58.39h-27.68v-58.39Z"/></g></g><g id="Ebene_6"><g><path class="cls-1" d="M771.2,343.68h32.6v2.36h-35v-63.55h2.4v61.19Z"/><path class="cls-1" d="M821.27,346.04h-2.36v-63.55h2.36v63.55Z"/><path class="cls-1" d="M859.42,339.84l1.27,3.84,1.27-3.84,21.34-57.35h2.58l-23.74,63.55h-2.88l-23.74-63.55h2.57l21.34,57.35Z"/><path class="cls-1" d="M932.54,314.53h-31.86v29.15h36.31v2.36h-38.67v-63.55h38.67v2.36h-36.31v27.32h31.86v2.36Z"/></g></g></svg>
                    </a>


                       <div>
                           @if( auth()->check() )
                               <a class="nav-link" href="#">{{ auth()->user()->name }}</a> |

                               <div class="d-flex">
                                   <a href="/logout" role="button">Logout</a>
                               </div>
                           @endif
                       </div>
                    </div>
                </div>
            </nav>
        </div>

        @yield('content')

    </body>
</html>
