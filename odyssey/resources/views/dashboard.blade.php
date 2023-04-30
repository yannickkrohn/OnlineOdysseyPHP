@extends('layout')
@section('content')
<div>


    <div class="col-lg-8 mx-auto p-4 py-md-5">

        <main>

            <h5>Deine Odyssey Tickets:</h5>
            <br />

            @if (count($gamePasses))
                <div class="tickets">

                        @foreach ($gamePasses as $gamePass)
                            <div class="ticket">
                                <div class="holes-top"></div>
                                <div class="title">
                                    <p class="cinema">Odyssey</p>
                                    <p class="movie-title">{{ $gamePass->game->name }}</p>
                                </div>
                                <div class="poster">
                                    <img src="/assets/img/brimstone/cover-image.png" alt="Movie: Only God Forgives" />
                                </div>
                                <div class="info">

                                    <table>
                                        <tr>
                                            <th>Schwierigkeit</th>
                                            <th>Status</th>
                                        </tr>
                                        <tr>
                                            <td>@if ($gamePass->status === 1)
                                                    <span class="badge text-bg-success">Leicht</span>
                                                @elseif ($gamePass->status === 2)
                                                    <span class="badge text-bg-light">Normal</span>
                                                @elseif ($gamePass->status === 3)
                                                    <span class="badge text-bg-danger">Experte</span>
                                                @endif
                                            </td>
                                            <td> @if ($gamePass->status === 0)
                                                    <span class="badge text-bg-light">Nicht gestartet</span>
                                                @elseif ($gamePass->status === 1)
                                                    <span class="badge text-bg-info">Vorbereitung</span>
                                                @elseif ($gamePass->status === 2)
                                                    <span class="badge text-bg-warning">Gestartet</span>
                                                @elseif ($gamePass->status === 3)
                                                    <span class="badge text-bg-success">Abgeschlossen</span>
                                                @endif</td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="holes-lower"></div>

                                <div class="serial">
                                    <table class="barcode"><tr></tr></table>
                                    <table class="numbers">
                                        <tr>
                                            <td>9</td>
                                            <td>1</td>
                                            <td>7</td>
                                            <td>3</td>
                                            <td>7</td>
                                            <td>5</td>
                                            <td>4</td>
                                            <td>4</td>
                                            <td>4</td>
                                            <td>5</td>
                                            <td>4</td>
                                            <td>1</td>
                                            <td>4</td>
                                            <td>7</td>
                                            <td>8</td>
                                            <td>7</td>
                                            <td>3</td>
                                            <td>4</td>
                                            <td>1</td>
                                            <td>4</td>
                                            <td>5</td>
                                            <td>2</td>
                                        </tr>
                                    </table>
                                </div>
                                <a class="btn btn-primary" href="/odyssey?id={{ $gamePass->id }}" role="button">
                                    @if ($gamePass->status === 0)
                                        Ticket einlösen
                                    @else
                                        Zur Odyssey
                                    @endif
                                </a>
                            </div>
                        @endforeach
                </div>
            @else
                You don't have any game passes.
            @endif
        </main>
        <footer class="pt-5 my-5 text-muted">
            Odyssey &middot; &copy; 2023
        </footer>
    </div>
</div>

<script>
    var code = '11010010000100111011001011101111011010001110101110011001101110010010111101110111001011001001000011011000111010110001001110111101101001011010111000101101';

    var table = document.querySelectorAll('.barcode tr');
    for (var i = 0; i < code.length; i++) {
        if (code[i] == '1') {
            var td = document.createElement('td');
            td.style.backgroundColor = "black";
            table[0].appendChild(td);
        } else {
            var td = document.createElement('td');
            td.style.backgroundColor = "white";
            table[0].appendChild(td);
        }
    }
</script>
@endsection
