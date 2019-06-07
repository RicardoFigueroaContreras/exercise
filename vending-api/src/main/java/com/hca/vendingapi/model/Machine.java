package com.hca.vendingapi.model;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Machine {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String address;

	private Integer quarterStock;

	private Integer dollarStock;

	private Boolean allowDollar;

	@Enumerated(EnumType.STRING)
	private Status status;

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Integer getQuarterStock() {
		return this.quarterStock;
	}

	public void setQuarterStock(Integer quarterStock) {
		this.quarterStock = quarterStock;
	}

	public Integer getDollarStock() {
		return this.dollarStock;
	}

	public void setDollarStock(Integer dollarStock) {
		this.dollarStock = dollarStock;
	}

	public Boolean getAllowDollar() {
		return this.allowDollar;
	}

	public void setAllowDollar(Boolean allowDollar) {
		this.allowDollar = allowDollar;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Machine [id=" + id + ", address=" + address + ", quarterStock=" + quarterStock + ", dollarStock="
				+ dollarStock + ", allowDollar=" + allowDollar + ", status=" + status + "]";
	}

}