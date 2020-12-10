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

