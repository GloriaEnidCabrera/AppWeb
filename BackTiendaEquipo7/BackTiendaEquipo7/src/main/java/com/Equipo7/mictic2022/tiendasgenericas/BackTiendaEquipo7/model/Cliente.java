package com.Equipo7.mictic2022.tiendasgenericas.BackTiendaEquipo7.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "clientes")
public class Cliente {
	
	@Id
	private String id;
	
	@Indexed(unique=true)
	private Long cedulaCliente;
	private String nombreCliente;
	private String direccionCliente;
	private Long telefonoCliente;
	private String correoElectronicoCliente;
	
	
	public Cliente() {
		
	}
	
	public Cliente(Long cedulaCliente, String nombreCliente, String direccionCliente, 
			Long telefonoCliente, String correoElectronicoCliente) {
		
		super();
		this.cedulaCliente = cedulaCliente;
		this.nombreCliente = nombreCliente;
		this.direccionCliente = direccionCliente;
		this.telefonoCliente = telefonoCliente;
		this.correoElectronicoCliente = correoElectronicoCliente;
		
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Long getCedulaCliente() {
		return cedulaCliente;
	}

	public void setCedulaCliente(Long cedulaCliente) {
		this.cedulaCliente = cedulaCliente;
	}

	public String getNombreCliente() {
		return nombreCliente;
	}

	public void setNombreCliente(String nombreCliente) {
		this.nombreCliente = nombreCliente;
	}

	public String getDireccionCliente() {
		return direccionCliente;
	}

	public void setDireccionCliente(String direccionCliente) {
		this.direccionCliente = direccionCliente;
	}

	public Long getTelefonoCliente() {
		return telefonoCliente;
	}

	public void setTelefonoCliente(Long telefonoCliente) {
		this.telefonoCliente = telefonoCliente;
	}

	public String getCorreoElectronicoCliente() {
		return correoElectronicoCliente;
	}

	public void setCorreoElectronicoCliente(String correoElectronicoCliente) {
		this.correoElectronicoCliente = correoElectronicoCliente;
	}
	

}
