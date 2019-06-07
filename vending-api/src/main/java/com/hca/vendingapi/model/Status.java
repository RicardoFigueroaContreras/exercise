package com.hca.vendingapi.model;

public enum Status {

	NOMONEY("NOMONEY"), 
	HASMONEY("HASMONEY"), 
	SODASOLD("SODASOLD"), 
	OUTOFSODA("OUTOFSODA"), 
	INSTOCK("INSTOCK"), 
	OUTOFSTOCK("OUTOFSTOCK");

	private String code;

	Status(String code) {
		this.code = code;
	}

	public String getCode() {
		return code;
	}

	public static Status fromCode(String code) {
		for (Status status : Status.values()) {
			if (status.getCode().equals(code)) {
				return status;
			}
		}
		throw new UnsupportedOperationException("The code " + code + " is not supported!");
	}
}
