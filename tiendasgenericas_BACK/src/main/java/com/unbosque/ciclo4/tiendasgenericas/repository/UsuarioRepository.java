package com.unbosque.ciclo4.tiendasgenericas.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.unbosque.ciclo4.tiendasgenericas.model.Usuario;

/**
 * El objeto que se va almacenar, y cuando se hagan busquedas van a ser por
 * cadenas, igual tambien en los metodos se puede buscar por otro tipo de dato,
 * ya que se pueden convertir a string al final
 * 
 * @author Dairon Perilla
 *
 */
public interface UsuarioRepository extends MongoRepository<Usuario, String> {

	List<Usuario> findByUsername(String username);

	//List<Usuario> findByEmail(String email);
}
