create table if not exists Tasks(
    taskuserid int,
    taskid serial,
    taskname varchar(50) unique not null,
    taskdescription varchar(255) not null,
    taskdate timestamp(0),
    constraint id foreign key(taskuserid) references accounts(userid)
);