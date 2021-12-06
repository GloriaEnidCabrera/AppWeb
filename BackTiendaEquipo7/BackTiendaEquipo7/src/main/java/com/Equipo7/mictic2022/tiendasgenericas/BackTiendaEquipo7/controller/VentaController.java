package com.Equipo7.mictic2022.tiendasgenericas.BackTiendaEquipo7.controller;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
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

import com.Equipo7.mictic2022.tiendasgenericas.BackTiendaEquipo7.model.Venta;
import com.Equipo7.mictic2022.tiendasgenericas.BackTiendaEquipo7.repository.VentaRepository;



@CrossOrigin(origins = "*")
//@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class VentaController {

	@Autowired
	VentaRepository ventaRepository;

	// REVISAR EN EL PROYECTO el consecutivo de la venta debe ser el numero de la
	// factura
	
	@GetMapping("/ventas/consecutivo")
	public ResponseEntity<Long> getVentaConsecutivo() {
		try {
			ArrayList<Venta> aux = (ArrayList<Venta>) ventaRepository.findAll();
			int index = aux.size() - 1;
			long consecutivo = aux.get(index).getCodigoventa() + 1;

			return new ResponseEntity<>(consecutivo, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/ventas")
	public ResponseEntity<List<Venta>> getAllVentas() {
		try {
			List<Venta> ventas = new ArrayList<Venta>();

			ventaRepository.findAll().forEach(ventas::add);

			if (ventas.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(ventas, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/ventas/id/{id}")
	public ResponseEntity<Venta> getVentaById(@PathVariable("id") String id) {
		Optional<Venta> ventaData = ventaRepository.findById(id);

		if (ventaData.isPresent()) {
			return new ResponseEntity<>(ventaData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
	}

	@GetMapping("/ventas/codigo/{codigo}")
	public ResponseEntity<Venta> getVentaByCodigoventa(@PathVariable("codigo") Long codigo) {
		Venta aux = ventaRepository.findByCodigoventa(codigo).get(0);
		Optional<Venta> ventaData = Optional.of(aux);

		if (ventaData.isPresent()) {
			return new ResponseEntity<>(ventaData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
	}

	@GetMapping("/ventas/cedula/{cedula}")
	public ResponseEntity<ArrayList<Venta>> getVentaByCedulaCliente(@PathVariable("cedula") Long cedulaCliente) {
		ArrayList<Venta> aux = (ArrayList<Venta>) ventaRepository.findByCedulaCliente(cedulaCliente);
		Optional<ArrayList<Venta>> ventaData = Optional.of(aux);

		if (ventaData.isPresent()) {
			return new ResponseEntity<>(ventaData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
	}

	@PostMapping("/ventas")
	public ResponseEntity<Venta> createVenta(@RequestBody Venta sale) {
		try {
			Venta _venta = ventaRepository.save(new Venta(sale.getCedulaCliente(), sale.getCodigoventa(),
					sale.getDetalleventa(), sale.getIvaventa(), sale.getTotalventa(), sale.getValorventa()));
			return new ResponseEntity<>(_venta, HttpStatus.CREATED);
		} catch (DuplicateKeyException e) {
			return new ResponseEntity<>(null, HttpStatus.IM_USED);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// RECOMENDACIÓN, ENVIAR JSON SIN ID PERO EL SI ES OBLIGATORIO EN LA URL
	@PutMapping("/ventas/id/{id}")
	public ResponseEntity<Venta> updateVentaById(@PathVariable("id") String id, @RequestBody Venta sale) {
		Optional<Venta> ventaData = ventaRepository.findById(id);

		if (ventaData.isPresent()) {
			Venta _venta = ventaData.get();
			_venta.setCedulacliente(sale.getCedulaCliente());
			_venta.setCodigoventa(sale.getCodigoventa());
			_venta.setDetalleventa(sale.getDetalleventa());
			_venta.setIvaventa(sale.getIvaventa());
			_venta.setTotalventa(sale.getTotalventa());
			_venta.setValorventa(sale.getValorventa());

			return new ResponseEntity<>(ventaRepository.save(_venta), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
	}

	@PutMapping("/ventas/codigo/{codigo}")
	public ResponseEntity<Venta> updateVentaByCodigoventa(@PathVariable("codigo") long codigo,
			@RequestBody Venta sale) {
		Venta aux = ventaRepository.findByCodigoventa(codigo).get(0);
		Optional<Venta> ventaData = Optional.of(aux);

		if (ventaData.isPresent()) {
			Venta _venta = ventaData.get();
			_venta.setCedulacliente(sale.getCedulaCliente());
			_venta.setCodigoventa(sale.getCodigoventa());
			_venta.setDetalleventa(sale.getDetalleventa());
			_venta.setIvaventa(sale.getIvaventa());
			_venta.setTotalventa(sale.getTotalventa());
			_venta.setValorventa(sale.getValorventa());

			return new ResponseEntity<>(ventaRepository.save(_venta), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
	}

	@DeleteMapping("/ventas/id/{id}")
	public ResponseEntity<HttpStatus> deleteVentasById(@PathVariable("id") String id) {
		try {
			ventaRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.ACCEPTED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/ventas/cedula/{cedula}")
	public ResponseEntity<HttpStatus> deleteVentasByCedulaCliente(@PathVariable("cedula") long cedulaCliente) {
		try {
			ventaRepository.deleteByCodigoventa(cedulaCliente);
			return new ResponseEntity<>(HttpStatus.ACCEPTED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/ventas/codigo/{codigo}")
	public ResponseEntity<HttpStatus> deleteByCodigoventa(@PathVariable("codigo") Long codigo) {
		try {
			ventaRepository.deleteByCodigoventa(codigo);
			return new ResponseEntity<>(HttpStatus.ACCEPTED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/ventas")
	public ResponseEntity<HttpStatus> deleteAllVentas() {
		try {
			ventaRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/ventas/{cedula}")
	public ResponseEntity<List<Venta>> findByCedulaCliente(@PathVariable("cedula") Long cedulaCliente) {
		try {
			List<Venta> ventas = ventaRepository.findByCedulaCliente(cedulaCliente);

			if (ventas.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(ventas, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}