package com.Equipo7.mictic2022.tiendasgenericas.BackTiendaEquipo7.controller;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Equipo7.mictic2022.tiendasgenericas.BackTiendaEquipo7.model.Consolidado;
import com.Equipo7.mictic2022.tiendasgenericas.BackTiendaEquipo7.repository.ConsolidadoRepository;



@CrossOrigin(origins = "*")
//@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class ConsolidadoController {

	@Autowired
	ConsolidadoRepository consolidadoRepository;

	@GetMapping("/consolidados")
	public ResponseEntity<List<Consolidado>> getAllConsolidados(@RequestParam(required = false) String ciudad) {
		try {
			List<Consolidado> consolidados = new ArrayList<Consolidado>();
			if (ciudad == null) {
				consolidadoRepository.findAll().forEach(consolidados::add);
			} else {
				consolidadoRepository.findByCiudad(ciudad).forEach(consolidados::add);
			}
			if (consolidados.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(consolidados, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/consolidados/ciudad/{ciudad}")
	public ResponseEntity<List<Consolidado>> getConsolidadosByCiudad(@PathVariable("ciudad") String ciudad) {
		try {
			List<Consolidado> consolidados = new ArrayList<Consolidado>();
			consolidadoRepository.findByCiudad(ciudad).forEach(consolidados::add);
			if (consolidados.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(consolidados, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	/*@GetMapping("/consolidados/{id}")
	public ResponseEntity<Consolidado> getConsolidadoById(@PathVariable("id") String id) {
		Optional<Consolidado> consolidadoData = consolidadoRepository.findById(id);

		if (consolidadoData.isPresent()) {
			return new ResponseEntity<>(consolidadoData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}*/

	@PostMapping("/consolidados/agregar/{cod}")
	public ResponseEntity<Consolidado> sumNewVentaToConsolidado(@PathVariable("cod") String cod) {
		List<Consolidado> list = consolidadoRepository.findAll();
		if(list.isEmpty()) {
			consolidadoRepository.save(new Consolidado("Bogota",0L));
			consolidadoRepository.save(new Consolidado("Cali",0L));
			consolidadoRepository.save(new Consolidado("Medellin",0L));
		}
		try {
			if (cod.equals("1")) {
				Consolidado aux = consolidadoRepository.findByCiudad("Bogota").get(0);
				Optional<Consolidado> consolidadoData = Optional.of(aux);

				if (consolidadoData.isPresent()) {
					Consolidado _consolidado = consolidadoData.get();
					_consolidado.setTotalventas(_consolidado.getTotalventas() + 1);
					return new ResponseEntity<>(consolidadoRepository.save(_consolidado), HttpStatus.ACCEPTED);
				}
			}else if (cod.equals("3")) {
				Consolidado aux = consolidadoRepository.findByCiudad("Cali").get(0);
				Optional<Consolidado> consolidadoData = Optional.of(aux);

				if (consolidadoData.isPresent()) {
					Consolidado _consolidado = consolidadoData.get();
					_consolidado.setTotalventas(_consolidado.getTotalventas() + 1);
					return new ResponseEntity<>(consolidadoRepository.save(_consolidado), HttpStatus.ACCEPTED);
				}
			}else if (cod.equals("2")) {
				Consolidado aux = consolidadoRepository.findByCiudad("Medellin").get(0);
				Optional<Consolidado> consolidadoData = Optional.of(aux);

				if (consolidadoData.isPresent()) {
					Consolidado _consolidado = consolidadoData.get();
					_consolidado.setTotalventas(_consolidado.getTotalventas() + 1);
					return new ResponseEntity<>(consolidadoRepository.save(_consolidado), HttpStatus.ACCEPTED);
				}
			}
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/*@PutMapping("/consolidados/{id}")
	public ResponseEntity<Consolidado> updateConsolidado(@PathVariable("id") String id,
			@RequestBody Consolidado consolidated) {
		Optional<Consolidado> consolidadoData = consolidadoRepository.findById(id);

		if (consolidadoData.isPresent()) {
			Consolidado _consolidado = consolidadoData.get();
			_consolidado.setCiudad(consolidated.getCiudad());
			_consolidado.setTotalventas(consolidated.getTotalventas());
			return new ResponseEntity<>(consolidadoRepository.save(_consolidado), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/consolidados/{id}")
	public ResponseEntity<HttpStatus> deleteConsolidados(@PathVariable("id") String id) {
		try {
			consolidadoRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}*/

}