package com.hca.vendingapi.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hca.vendingapi.model.Product;
import com.hca.vendingapi.service.ProductService;

@RestController
@RequestMapping(path = "/product")
public class ProductApiController extends AbstractApiController {

	@Autowired
	private ProductService service;

	@GetMapping(path = "/machine/{machineId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Product> getAllByMachineId(@PathVariable Long machineId) {
		return service.getByMachineId(machineId);
	}

	@GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public Optional<Product> getProduct(@PathVariable Long id) throws Exception {
		return service.getProduct(id);
	}

	@PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public void updateProduct(@RequestBody Product product) {
		service.update(product);
	}

}