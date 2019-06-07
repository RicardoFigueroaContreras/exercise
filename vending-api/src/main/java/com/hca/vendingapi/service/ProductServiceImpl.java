package com.hca.vendingapi.service;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hca.vendingapi.exception.BusinessException;
import com.hca.vendingapi.model.Product;
import com.hca.vendingapi.model.Status;
import com.hca.vendingapi.repository.ProductRepository;

/**
 * 
 * @author Ricardo Figueroa
 *
 */
@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepository repository;

	@Override
	public Product update(Product product) {

		if (product.getCurrentStock().equals(BigInteger.ZERO.intValue())) {
			product.setStockStatus(Status.OUTOFSTOCK);
		}

		return repository.save(product);
	}

	@Override
	public Optional<Product> getProduct(Long id) throws BusinessException {

		Optional<Product> product = repository.getObjectById(id);

		product.orElseThrow(() -> new BusinessException("No soda found"));

		return product;
	}

	@Override
	public List<Product> getByMachineId(Long machineId) {
		return repository.getByMachineId(machineId);
	}
}
