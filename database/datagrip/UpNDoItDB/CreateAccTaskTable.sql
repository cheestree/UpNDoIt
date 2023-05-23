create table if not exists Tasks(
    id int,
    taskname varchar(50) unique not null,
    taskdescription varchar(255) not null,
    date timestamp,
    constraint id foreign key(id) references accounts(userid)
);