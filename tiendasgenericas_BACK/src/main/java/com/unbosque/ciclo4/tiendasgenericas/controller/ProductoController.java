package com.unbosque.ciclo4.tiendasgenericas.controller;

import com.unbosque.ciclo4.tiendasgenericas.model.Producto;
import com.unbosque.ciclo4.tiendasgenericas.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class ProductoController {

    @Autowired
    ProductoRepository productoRepository;

    @GetMapping("/productos")
    public ResponseEntity<List<Producto>> getProductos(@RequestParam(required = false) String nombreProducto) {

        try {
            List<Producto> products = new ArrayList<>();

            if (nombreProducto == null) {
                productoRepository.findAll().forEach(products::add);
            } else {
                productoRepository.findByNombreProducto(nombreProducto).forEach(products::add);
            }

            if (products.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<List<Producto>>(products, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/productos/{id]")
    public ResponseEntity<Producto> getProductoById(@PathVariable("id") String id) {
        Optional<Producto> producto = productoRepository.findById(id);
        if (producto.isPresent()) {
            return new ResponseEntity<Producto>(producto.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/productos/{codigoProducto}")
    public ResponseEntity<List<Producto>> getProductoByCode(@PathVariable("codigoProducto") Long codigoProducto) {

        try {
            List<Producto> productos = productoRepository.findByCodigoProducto(codigoProducto);

            if (productos.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            }

            return new ResponseEntity<>(productos, HttpStatus.OK);

        } catch (Exception e) {

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/productos")
    public ResponseEntity<Producto> createProducto(@RequestBody Producto producto) {
        Logger logger = Logger.getLogger("Mylog");
        logger.log(Level.WARNING, producto.toString());
        try {
            Producto _producto = productoRepository.save(
                    new Producto(producto.getCodigoProducto(), producto.getIvaProducto(), producto.getNitProvedor(),
                            producto.getNombreProducto(), producto.getPrecioVenta(), producto.getPrecioCompra()));
            logger.log(Level.WARNING, producto.toString());
            return new ResponseEntity<Producto>(_producto, HttpStatus.OK);

        } catch (Exception e) {

            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/productos/{id}")
    public ResponseEntity<Producto> updateProducto(@PathVariable("id") String id, @RequestBody Producto producto) {

        Optional<Producto> productoData = productoRepository.findById(id);

        if (productoData.isPresent()) {
            Producto _producto = productoData.get();
            _producto.setCodigoProducto(producto.getCodigoProducto());
            _producto.setIvaProducto(producto.getIvaProducto());
            _producto.setNitProvedor(producto.getNitProvedor());
            _producto.setNombreProducto(producto.getNombreProducto());
            _producto.setPrecioVenta(producto.getPrecioVenta());
            _producto.setPrecioCompra(producto.getPrecioCompra());

            return new ResponseEntity<>(productoRepository.save(_producto), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @DeleteMapping("/productos/{id}")
    public ResponseEntity<HttpStatus> deleteProduct(@PathVariable("id") String id) {
        try {

            productoRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (Exception e) {

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/productos")
    public ResponseEntity<HttpStatus> deleteAllProduct() {
        try {
            productoRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
