package com.hca.vendingapi.service;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hca.vendingapi.exception.BusinessException;
import com.hca.vendingapi.model.Machine;
import com.hca.vendingapi.model.Product;
import com.hca.vendingapi.model.Status;
import com.hca.vendingapi.repository.MachineRepository;

/**
 * 
 * @author Ricardo Figueroa
 *
 */
@Service
public class MachineServiceImpl implements MachineService {

	@Autowired
	private MachineRepository repository;

	@Autowired
	private ProductService productService;
	
	@Override
	public Machine update(Machine machine) {

		List<Product> productList = productService.getByMachineId(machine.getId());
		Integer totalSodaCount = productList.stream().mapToInt(p -> p.getCurrentStock()).sum();

		if (totalSodaCount.equals(BigInteger.ZERO.intValue())) {
			machine.setStatus(Status.OUTOFSODA);
		}

		return repository.save(machine);
	}

	@Override
	public Optional<Machine> getMachine(Long id) throws BusinessException {

		Optional<Machine> machine = repository.getObjectById(id);

		machine.orElseThrow(() -> new BusinessException("No machine found"));

		return machine;
	}

}
