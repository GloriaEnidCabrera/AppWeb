package com.unbosque.ciclo4.tiendasgenericas.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "productos")
public class Producto {

    @Id
    private String id;

    private Long codigoProducto;
    private double ivaProducto;
    private Long nitProvedor;
    private String nombreProducto;
    private double precioVenta;
    private double precioCompra;

    public Producto() {
    }

    public Producto(Long codigoProducto, double ivaProducto, Long nitProvedor,
                    String nombreProducto, double precioVenta, double precioCompra) {
        this.id = id;
        this.codigoProducto = codigoProducto;
        this.ivaProducto = ivaProducto;
        this.nitProvedor = nitProvedor;
        this.nombreProducto = nombreProducto;
        this.precioVenta = precioVenta;
        this.precioCompra = precioCompra;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getCodigoProducto() {
        return codigoProducto;
    }

    public void setCodigoProducto(Long codigoProducto) {
        this.codigoProducto = codigoProducto;
    }

    public double getIvaProducto() {
        return ivaProducto;
    }

    public void setIvaProducto(double ivaProducto) {
        this.ivaProducto = ivaProducto;
    }

    public Long getNitProvedor() {
        return nitProvedor;
    }

    public void setNitProvedor(Long nitProvedor) {
        this.nitProvedor = nitProvedor;
    }

    public String getNombreProducto() {
        return nombreProducto;
    }

    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }

    public double getPrecioVenta() {
        return precioVenta;
    }

    public void setPrecioVenta(double precioVenta) {
        this.precioVenta = precioVenta;
    }

    public double getPrecioCompra() {
        return precioCompra;
    }

    public void setPrecioCompra(double precioCompra) {
        this.precioCompra = precioCompra;
    }
}
