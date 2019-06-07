package com.hca.vendingapi.service;

import java.util.List;
import java.util.Optional;

import com.hca.vendingapi.exception.BusinessException;
import com.hca.vendingapi.model.Product;

public interface ProductService {

	Product update(Product objToUpdate);

	Optional<Product> getProduct(Long id) throws BusinessException;
	
	List<Product> getByMachineId(Long machineId);

}
