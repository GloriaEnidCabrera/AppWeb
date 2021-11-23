package com.Equipo7.mictic2022.tiendasgenericas.BackTiendaEquipo7.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Equipo7.mictic2022.tiendasgenericas.BackTiendaEquipo7.model.Cliente;

import com.Equipo7.mictic2022.tiendasgenericas.BackTiendaEquipo7.repository.ClienteRepository;


@CrossOrigin(origins = "*")
//@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")

public class ClienteController {
	
	@Autowired
	ClienteRepository clienteRepository;
	
	@GetMapping("/clientes")
	public ResponseEntity<List<Cliente>> getAllClientes(@RequestParam(required = false) Long cedulaCliente) {
		try {
			List<Cliente> clientes = new ArrayList<Cliente>();

			if (cedulaCliente == null) {
				clienteRepository.findAll().forEach(clientes::add);
			} else {
				clienteRepository.findBycedulaCliente(cedulaCliente).forEach(clientes::add);
				
				
				
			}

			if (clientes.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(clientes, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	
	 @GetMapping("/clientes/{id}")
	  public ResponseEntity<Cliente> getClienteById(@PathVariable("id") String id) {
	    Optional<Cliente> clienteData = clienteRepository.findById(id);

	    if (clienteData.isPresent()) {
	      return new ResponseEntity<>(clienteData.get(), HttpStatus.OK);
	    } else {
	      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	  }

	  @PostMapping("/clientes")
	  public ResponseEntity<Cliente> createUsuario(@RequestBody Cliente user) {
	    try {
	      Cliente _usuario = clienteRepository.save(new Cliente(user.getCedulaCliente(),
	    		  user.getNombreCliente(),user.getDireccionCliente(),user.getTelefonoCliente(), 
	    		  user.getCorreoElectronicoCliente()));
	      return new ResponseEntity<>(_usuario, HttpStatus.CREATED);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }

	  
	  @PutMapping("/clientes/{id}")
	  public ResponseEntity<Cliente> updateCliente(@PathVariable("id") String id, @RequestBody Cliente user) {
	    Optional<Cliente> clienteData = clienteRepository.findById(id);

	    if (clienteData.isPresent()) {
	      Cliente _cliente = clienteData.get();
	      _cliente.setCedulaCliente(user.getCedulaCliente());
	      _cliente.setNombreCliente(user.getNombreCliente());
	      _cliente.setDireccionCliente(user.getDireccionCliente());
	      _cliente.setTelefonoCliente(user.getTelefonoCliente());
	      _cliente.setCorreoElectronicoCliente(user.getCorreoElectronicoCliente());
	      
	      
	      
	      return new ResponseEntity<>(clienteRepository.save(_cliente), HttpStatus.OK);
	    } else {
	      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	  }

	  @DeleteMapping("/clientes/{id}")
	  public ResponseEntity<HttpStatus> deleteClientes(@PathVariable("id") String id) {
	    try {
	      clienteRepository.deleteById(id);
	      return new ResponseEntity<>(HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }

	  @DeleteMapping("/clientes")
	  public ResponseEntity<HttpStatus> deleteAllClientes() {
	    try {
	      clienteRepository.deleteAll();
	      return new ResponseEntity<>(HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }

	  @GetMapping("/clientes={cedulaCliente}")
	  public ResponseEntity<List<Cliente>> findByCedulaCliente(@PathVariable("cedulaCliente") Long cedulaCliente) {
	    try {
	    	List<Cliente> cliente = clienteRepository.findBycedulaCliente(cedulaCliente);
	     

	      if (cliente.isEmpty()) {
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	      }
	      return new ResponseEntity<>(cliente, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }

}
