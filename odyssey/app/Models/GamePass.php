<?php

    namespace App\Models;

    use Illuminate\Database\Eloquent\Model;

    class GamePass extends Model {
        protected $table = 'game_passes';
        protected $primaryKey = 'id';
        public $incrementing = false;
        protected $keyType = 'string';
        protected $dates = ['buy_time'];
        public $timestamps = false;

        protected $fillable = ['id', 'difficulty', 'buy_time', 'owner_id', 'status', 'game_data', 'available_until', 'game_id',];

        public function scopeForUser($query, $userId) {
            return $query->where('owner_id', $userId);
        }

        public static function getAllGamePassesForUser()
        {
            return self::forUser(auth()->id())->get();
        }

        public function owner()
        {
            return $this->belongsTo('App\Models\User', 'owner_id');
        }

        public function game()
        {
            return $this->belongsTo('App\Models\Game', 'game_id');
        }


        public function setOwner(User $owner)
        {
            $this->owner()->associate($owner);
        }

        public function setGame(Game $game)
        {
            $this->game()->associate($game);
        }

        public function getGame()
        {
            return $this->game;
        }


        /**
         * Check if the game has a participant with the given user ID.
         *
         * @param int $userId
         * @return bool
         */
        public function hasParticipant(int $userId): bool
        {

            return (bool) $this->gameParticipants()
                ->where('participant_id', $userId)
                ->count();
        }


        /**
         * Check if the user owns the gamepass
         *
         * @param int $userId
         * @return bool
         */
        public function isOwner(int $userId): bool
        {
            return $this->owner_id == $userId;
        }




        /**
         * Get the game participants of the game.
         *
         * @return \Illuminate\Database\Eloquent\Relations\HasMany
         */
        public function gameParticipants()
        {
            return $this->hasMany(GameParticipant::class, 'game_id', 'id');
        }

    }
