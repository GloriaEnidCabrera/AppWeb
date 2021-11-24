package com.Equipo7.mictic2022.tiendasgenericas.BackTiendaEquipo7.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.Equipo7.mictic2022.tiendasgenericas.BackTiendaEquipo7.model.Usuario;




public interface UsuarioRepository extends MongoRepository<Usuario, String>{
   List<Usuario> findByUsername(String username);

   List<Usuario> findByNombreusuario(String nombreusuario);


}
