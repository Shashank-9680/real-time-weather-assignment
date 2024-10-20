import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const AlertsPanel = ({ alerts, onAcknowledge }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Weather Alerts</h3>
      {alerts.length === 0 ? (
        <p className="text-gray-500">No active alerts</p>
      ) : (
        alerts.map((alert) => (
          <Alert
            key={alert._id}
            variant={alert.acknowledged ? "default" : "destructive"}
            className="relative"
          >
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle className="flex items-center gap-2">
              {alert.type.replace("_", " ")}
              <span className="text-sm text-gray-500">
                {new Date(alert.timestamp).toLocaleString()}
              </span>
            </AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
            {!alert.acknowledged && (
              <button
                onClick={() => onAcknowledge(alert._id)}
                className="absolute top-2 right-2 text-sm text-blue-600 hover:text-blue-800"
              >
                Acknowledge
              </button>
            )}
          </Alert>
        ))
      )}
    </div>
  );
};
export default AlertsPanel;
