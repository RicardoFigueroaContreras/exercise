package com.hca.vendingapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hca.vendingapi.model.Sale;
import com.hca.vendingapi.service.SaleService;

@RestController
@RequestMapping(path = "/sale")
public class SaleApiController extends AbstractApiController {

	@Autowired
	private SaleService service;

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public Sale post(@RequestBody Sale payload) throws Exception {
		return service.create(payload);
	}

}