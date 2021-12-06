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
import org.springframework.web.bind.annotation.RestController;

import com.Equipo7.mictic2022.tiendasgenericas.BackTiendaEquipo7.model.Cliente;
import com.Equipo7.mictic2022.tiendasgenericas.BackTiendaEquipo7.repository.ClienteRepository;
import org.springframework.dao.DuplicateKeyException;
//import com.mongodb.DuplicateKeyException;


@CrossOrigin(origins = "*")
//@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")

public class ClienteController {
	
	@Autowired
	ClienteRepository clienteRepository;
	//@RequestParam(required = false) Long cedulaCliente
	@GetMapping("/clientes")
	public ResponseEntity<List<Cliente>> getAllClientes() {
	try {
			List<Cliente> clientes = new ArrayList<Cliente>();

				//if (cedulaCliente == null) {
				clienteRepository.findAll().forEach(clientes::add);
			/*} else {
				clienteRepository.findBycedulaCliente(cedulaCliente).forEach(clientes::add);				
						
			}*/

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

	  @PostMapping("/clientes")
	  public ResponseEntity<Cliente> createCliente(@RequestBody Cliente client) {
	    try {
	      Cliente _cliente = clienteRepository.save(new Cliente(
	    		  client.getCedulaCliente(),
	    		  client.getNombreCliente(),
	    		  client.getDireccionCliente(),
	    		  client.getTelefonoCliente(), 
	    		  client.getCorreoElectronicoCliente()));
	      return new ResponseEntity<>(_cliente, HttpStatus.CREATED);
	      //se cambio por excepcion a duplicados
	    } catch (DuplicateKeyException e) {
			return new ResponseEntity<>(null, HttpStatus.IM_USED);
		}catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }

	//RECOMENDACIÓN, ENVIAR JSON SIN ID PERO EL SI ES OBLIGATORIO EN LA URL
	  
		@PutMapping("/clientes/id/{id}")
		public ResponseEntity<Cliente> updateClienteById(@PathVariable("id") String id, @RequestBody Cliente client) {
			Optional<Cliente> clienteData = clienteRepository.findById(id);

			if (clienteData.isPresent()) {
				Cliente _cliente = clienteData.get();
				_cliente.setCedulaCliente(client.getCedulaCliente());
				_cliente.setDireccionCliente(client.getDireccionCliente());
				_cliente.setCorreoElectronicoCliente(client.getCorreoElectronicoCliente());
				_cliente.setNombreCliente(client.getNombreCliente());
				_cliente.setTelefonoCliente(client.getTelefonoCliente());
				
				return new ResponseEntity<>(clienteRepository.save(_cliente), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
		}
		
	  @PutMapping("/clientes/{cedula}")
	  public ResponseEntity<Cliente> updateClientebyCedula(@PathVariable("cedula") Long cedula, @RequestBody  Cliente user) {
		  //Cliente aux=clienteRepository.findByCedulacliente(cedula).get(0);
		  //Optional<Cliente> clienteData =  Optional.of(aux);
		  List<Cliente> cliente =clienteRepository.findBycedulaCliente(cedula);
		  String id = cliente.get(0).getId();
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

	  @DeleteMapping("/clientes/{cedula}")
	  public ResponseEntity<HttpStatus> deleteClientes(@PathVariable("cedula") Long cedulaCliente) {
	    try {
	      clienteRepository.deleteByCedulaCliente(cedulaCliente);
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



}