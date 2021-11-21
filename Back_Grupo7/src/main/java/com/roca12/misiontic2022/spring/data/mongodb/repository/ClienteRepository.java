package com.roca12.misiontic2022.spring.data.mongodb.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.roca12.misiontic2022.spring.data.mongodb.model.Cliente;


public interface ClienteRepository extends MongoRepository<Cliente, String>{
	
	List <Cliente> findBycedulaCliente(Long cedulaCliente);
	List <Cliente> findBynombreCliente(String nombreCliente);

}

