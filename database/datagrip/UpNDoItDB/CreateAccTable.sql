create table if not exists Accounts(
    userid serial primary key,
    username varchar(50) unique not null,
    password varchar(255) not null,
    birth timestamp not null
);