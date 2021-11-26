package com.Equipo7.mictic2022.tiendasgenericas.BackTiendaEquipo7.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.Equipo7.mictic2022.tiendasgenericas.BackTiendaEquipo7.model.Producto;



public interface ProductoRepository extends MongoRepository<Producto, String>{
	
	List<Producto> findByCodigoproducto(Long codigoproducto);
	
	List<Producto> findByNombreproducto(String nombreproducto);

}
