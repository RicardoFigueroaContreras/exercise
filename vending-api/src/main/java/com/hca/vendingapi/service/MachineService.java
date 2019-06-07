package com.hca.vendingapi.service;

import java.util.Optional;

import com.hca.vendingapi.exception.BusinessException;
import com.hca.vendingapi.model.Machine;

public interface MachineService {

	Machine update(Machine machine);

	Optional<Machine> getMachine(Long id) throws BusinessException;

}
