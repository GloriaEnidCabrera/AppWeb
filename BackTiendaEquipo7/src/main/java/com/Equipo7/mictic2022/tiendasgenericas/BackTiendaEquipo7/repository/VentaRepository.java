package com.Equipo7.mictic2022.tiendasgenericas.BackTiendaEquipo7.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.Equipo7.mictic2022.tiendasgenericas.BackTiendaEquipo7.model.Venta;

public interface VentaRepository extends MongoRepository<Venta, String> {

	List<Venta> findByCodigoventa(Long codigoventa);
	List<Venta> findByCedulacliente(Long cedulacliente);
	
	
	void deleteByCodigoventa(Long codigoventa);
	void deleteByCedulacliente(Long cedulacliente);
}
