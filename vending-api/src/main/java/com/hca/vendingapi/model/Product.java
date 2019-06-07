package com.hca.vendingapi.model;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private Long machineId;

	private String brand;

	private BigDecimal price;

	private String imgName;

	private Integer currentStock;

	private Integer minStock;

	private Integer maxStock;

	@Enumerated(EnumType.STRING)
	private Status stockStatus;

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getMachineId() {
		return this.machineId;
	}

	public void setMachineId(Long machineId) {
		this.machineId = machineId;
	}

	public String getBrand() {
		return this.brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public String getImgName() {
		return this.imgName;
	}

	public void setImgName(String imgName) {
		this.imgName = imgName;
	}

	public Integer getCurrentStock() {
		return this.currentStock;
	}

	public void setCurrentStock(Integer currentStock) {
		this.currentStock = currentStock;
	}

	public Integer getMinStock() {
		return this.minStock;
	}

	public void setMinStock(Integer minStock) {
		this.minStock = minStock;
	}

	public Integer getMaxStock() {
		return this.maxStock;
	}

	public void setMaxStock(Integer maxStock) {
		this.maxStock = maxStock;
	}

	public Status getStockStatus() {
		return stockStatus;
	}

	public void setStockStatus(Status stockStatus) {
		this.stockStatus = stockStatus;
	}

	@Override
	public String toString() {
		return "Product [id=" + id + ", machineId=" + machineId + ", brand=" + brand + ", price=" + price + ", imgName="
				+ imgName + ", currentStock=" + currentStock + ", minStock=" + minStock + ", maxStock=" + maxStock
				+ ", stockStatus=" + stockStatus + "]";
	}

}