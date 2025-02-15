package com.smartbanking.sol.services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.Map;

@Service
public class CurrencyExchangeService {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String API_URL = "https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/";

    public BigDecimal getExchangeRate(String fromCurrency, String toCurrency) {
        String url = API_URL + fromCurrency; // Example: https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD

        try {
            @SuppressWarnings("unchecked")
			Map<String, Object> response = restTemplate.getForObject(url, Map.class);

            if (response != null && response.containsKey("conversion_rates")) {
                @SuppressWarnings("unchecked")
				Map<String, Object> rates = (Map<String, Object>) response.get("conversion_rates");

                if (rates.containsKey(toCurrency)) {
                    return new BigDecimal(rates.get(toCurrency).toString());
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return BigDecimal.ONE; // Default to 1 if API fails
    }
}
