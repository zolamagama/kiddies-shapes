drop table if exists player_info, shapes;

create table player_info (
    id serial PRIMARY KEY NOT NULL,
    player_name text not null
);


create table shapes (
    id serial PRIMARY KEY not null,
    shape_name text not null,
    shape_counter int not null
);


-- create table play (


-- );

-- create table score (

--     id serial primary key not null,
--     player_id text not null,
--     foreign key (player_id) references player_info(id),
--     correct_shape text not null

-- );