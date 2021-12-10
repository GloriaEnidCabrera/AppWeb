package com.Equipo7.mictic2022.tiendasgenericas.BackTiendaEquipo7.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.Equipo7.mictic2022.tiendasgenericas.BackTiendaEquipo7.model.Consolidado;

public interface ConsolidadoRepository  extends MongoRepository<Consolidado, String>{
	
	List<Consolidado> findByCiudad(String ciudad);
}