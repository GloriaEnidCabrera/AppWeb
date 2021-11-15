package com.unbosque.ciclo4.tiendasgenericas.repository;

import com.unbosque.ciclo4.tiendasgenericas.model.Producto;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductoRepository extends MongoRepository<Producto, String> {

    List<Producto> findByCodigoProducto(Long codigoProducto);
    List<Producto> findByNombreProducto(String nombreProducto);

}
