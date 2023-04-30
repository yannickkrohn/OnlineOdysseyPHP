<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */

    public function up()
    {
        Schema::create('game_passes', function (Blueprint $table) {
            $table->string('id', 36)->primary();
            $table->string('difficulty');
            $table->timestamp('buy_time')->useCurrent();
            $table->bigInteger('owner_id')->unsigned();
            $table->integer('status')->default(0);
            $table->text('game_data');
            $table->timestamp('available_until')->nullable();
            $table->bigInteger('game_id')->unsigned();

            $table->foreign('owner_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('game_id')->references('id')->on('games')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('game_passes');
    }
};
