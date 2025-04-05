import React from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { 
  BellIcon,
  HomeIcon,
  CurrencyDollarIcon 
} from "@heroicons/react/24/solid";

export function VSTimelineModal() {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
      <Button onClick={handleOpen} variant="vibrant">
        Order Timeline Modal
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-theme-gradient border border-theme-border sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-theme-primary text-xl">Delivery Timeline</DialogTitle>
            <DialogDescription className="text-theme-secondary">
              Track your order delivery status and history.
            </DialogDescription>
            <button
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4 text-theme-primary" />
              <span className="sr-only">Close</span>
            </button>
          </DialogHeader>
          
          <div className="relative mx-4 -mt-2">
            {/* Timeline component */}
            <div className="relative border-l border-theme-border pl-6 ml-1.5 space-y-8 py-2">
              {/* Timeline Item 1 */}
              <div className="relative pb-2">
                <div className="absolute -left-[29px] p-1 rounded-full bg-theme-gradient-primary">
                  <HomeIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-theme-primary">$2,400, Design Changes</h4>
                  <p className="text-sm text-theme-secondary mt-1">22 Dec 6:20 PM</p>
                </div>
              </div>
              
              {/* Timeline Item 2 */}
              <div className="relative pb-2">
                <div className="absolute -left-[29px] p-1 rounded-full bg-theme-gradient-secondary">
                  <BellIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-theme-primary">New order #1832412</h4>
                  <p className="text-sm text-theme-secondary mt-1">21 Dec 8:20 PM</p>
                </div>
              </div>
              
              {/* Timeline Item 3 */}
              <div className="relative">
                <div className="absolute -left-[29px] p-1 rounded-full bg-theme-gradient-accent">
                  <CurrencyDollarIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-theme-primary">Payment Completed</h4>
                  <p className="text-sm text-theme-secondary mt-1">17 Dec 4:20 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-start border-t border-theme-border pt-4 mt-4">
            <Button variant="subtle" onClick={() => setOpen(false)}>
              View Order Details
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}