create database livraria;

use livraria;

create table genero (
  id int auto_increment primary key,
  nome varchar(50) not null unique
);

insert into genero (nome) values
  ('horror'),
  ('romance'),
  ('poesia'),
  ('fantasia');

create table livro (
  id int auto_increment primary key,
  titulo varchar(100) not null,
  autor varchar(100) not null,
  preco_venda decimal(3,2) not null,
  preco_compra decimal (3,2) not null,
  genero_id int not null,
  quantidade int not null,
  foreign key (genero_id) references genero(id)
);