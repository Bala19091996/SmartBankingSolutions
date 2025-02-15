package com.smartbanking.sol.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;

    public void sendAccountApprovalEmail(String toEmail, boolean approved) {
        String subject = approved ? "Your Bank Account is Approved" : "Your Bank Account is Rejected";
        String message = approved ? 
            "Congratulations! Your bank account has been successfully created." :
            "We regret to inform you that your bank account request has been declined.";

        sendEmail(toEmail, subject, message);
    }

    private void sendEmail(String to, String subject, String text) {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        try {
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text);
            helper.setFrom("admin@gmail.com");
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }
}
