package com.Equipo7.mictic2022.tiendasgenericas.BackTiendaEquipo7.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.Equipo7.mictic2022.tiendasgenericas.BackTiendaEquipo7.model.Cliente;


public interface ClienteRepository extends MongoRepository<Cliente, String>{

	List <Cliente> findBycedulaCliente(Long cedulaCliente);
	//List <Cliente> findBynombreCliente(String nombreCliente);
  void deleteByCedulaCliente(Long cedulaCliente);

}
