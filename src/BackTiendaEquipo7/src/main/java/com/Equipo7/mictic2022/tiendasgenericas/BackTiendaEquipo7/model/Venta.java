package com.Equipo7.mictic2022.tiendasgenericas.BackTiendaEquipo7.model;
import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "ventas")
public class Venta {
	@Id
	private String id;
	private long cedulaCliente;

	@Indexed(unique=true)
	private long codigoventa;
	private ArrayList<DetalleVenta> detalleventa;
	private double ivaventa;
	private double totalventa;
	private double valorventa;

	public Venta() {
		this.detalleventa= new ArrayList<DetalleVenta>();
	}

	public Venta(long cedulaCliente, long codigoventa, ArrayList<DetalleVenta> detalleventa, double ivaventa,
			double totalventa, double valorventa) {
		super();
		this.detalleventa= new ArrayList<DetalleVenta>();
		this.cedulaCliente = cedulaCliente;
		this.codigoventa = codigoventa;
		this.detalleventa = detalleventa;
		this.ivaventa = ivaventa;
		this.totalventa = totalventa;
		this.valorventa = valorventa;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public long getCedulaCliente() {
		return cedulaCliente;
	}

	public void setCedulacliente(long cedulaCliente) {
		this.cedulaCliente = cedulaCliente;
	}

	public long getCodigoventa() {
		return codigoventa;
	}

	public void setCodigoventa(long codigoventa) {
		this.codigoventa = codigoventa;
	}

	public ArrayList<DetalleVenta> getDetalleventa() {
		return detalleventa;
	}

	public void setDetalleventa(ArrayList<DetalleVenta> detalleventa) {
		this.detalleventa = detalleventa;
	}

	public double getIvaventa() {
		return ivaventa;
	}

	public void setIvaventa(double ivaventa) {
		this.ivaventa = ivaventa;
	}

	public double getTotalventa() {
		return totalventa;
	}

	public void setTotalventa(double totalventa) {
		this.totalventa = totalventa;
	}

	public double getValorventa() {
		return valorventa;
	}

	public void setValorventa(double valorventa) {
		this.valorventa = valorventa;
	}

}

