package com.smartbanking.sol.controller;


import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.smartbanking.sol.model.Transactions;
import com.smartbanking.sol.services.TransactionService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {



    @Autowired
    private TransactionService transactionService;
    
    @PostMapping("/cross-border")
    public ResponseEntity<String> crossBorderPayment(@RequestBody Map<String, Object> requestData) {
        String senderAccount = (String) requestData.get("senderAccount");
        String recipientAccount = (String) requestData.get("recipientAccount");
        BigDecimal amount = new BigDecimal(requestData.get("amount").toString());
        String senderCurrency = (String) requestData.get("senderCurrency");
        String recipientCurrency = (String) requestData.get("recipientCurrency");
        String note = (String) requestData.get("note");

        String responseMessage = transactionService.processCrossBorderPayment(senderAccount, recipientAccount, amount, senderCurrency, recipientCurrency, note);

        if (responseMessage.contains("successful")) {
            return ResponseEntity.ok(responseMessage);
        } else {
            return ResponseEntity.badRequest().body(responseMessage);
        }
    }
    
    @GetMapping
    public ResponseEntity<List<Transactions>> getAllTransactions() {
        return ResponseEntity.ok(transactionService.getAllTransactions());
    }

    // Get transaction history by user ID
    @GetMapping("/transactionHistory/{userId}")
    public ResponseEntity<List<Transactions>> getTransactionsByUserId(@PathVariable Long userId) {
        List<Transactions> transactions = transactionService.getTransactionsByUserId(userId);
        return ResponseEntity.ok(transactions); // Return empty list if no transactions
    }

    @PostMapping("/transfer")
    public ResponseEntity<String> transferFunds(@RequestBody Map<String, Object> requestData) {
        String senderAccount = (String) requestData.get("senderAccount");
        String recipientAccount = (String) requestData.get("recipientAccount");
        BigDecimal amount = new BigDecimal(requestData.get("amount").toString());
        String note = (String) requestData.get("note");

        String responseMessage = transactionService.transferFunds(senderAccount, recipientAccount, amount, note);

        if (responseMessage.equals("Transfer successful.")) {
            return ResponseEntity.ok(responseMessage);
        } else {
            return ResponseEntity.badRequest().body(responseMessage);
        }
    }
}
