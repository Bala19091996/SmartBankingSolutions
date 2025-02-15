package com.smartbanking.sol.model;

public class AdminStatsResponse {
    private long totalUsers;
    private long activeAccounts;
    private long pendingRequests;
    private long totalTransactions;

    public AdminStatsResponse(long totalUsers, long activeAccounts, long pendingRequests, long totalTransactions) {
        this.totalUsers = totalUsers;
        this.activeAccounts = activeAccounts;
        this.pendingRequests = pendingRequests;
        this.totalTransactions = totalTransactions;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public long getActiveAccounts() {
        return activeAccounts;
    }

    public long getPendingRequests() {
        return pendingRequests;
    }

    public long getTotalTransactions() {
        return totalTransactions;
    }
}
