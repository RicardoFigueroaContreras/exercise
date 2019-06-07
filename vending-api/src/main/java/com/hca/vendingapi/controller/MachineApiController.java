package com.hca.vendingapi.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hca.vendingapi.model.Machine;
import com.hca.vendingapi.service.MachineService;

@RestController
@RequestMapping(path = "/machine")
public class MachineApiController extends AbstractApiController {

	@Autowired
	private MachineService service;

	@GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public Optional<Machine> getMachine(@PathVariable Long id) throws Exception {
		return service.getMachine(id);
	}

	@PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public Machine put(@RequestBody Machine machine) throws Exception {
		return service.update(machine);
	}

}