import React from "react";
import {
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
} from "@material-tailwind/react";
import {
  HomeIcon,
  BellIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
 
export function OrderDetailsDialog() {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
      <Button 
        onClick={handleOpen} 
        variant="gradient"
        className="bg-theme-gradient-primary text-white shadow-theme-sm hover-bubbly-sm"
      >
        Order Details Modal
      </Button>
      <Dialog 
        size="sm" 
        open={open} 
        handler={handleOpen}
        className="bg-theme-gradient-card border border-[var(--theme-border-light)] shadow-theme-md"
      >
        <DialogHeader className="relative m-0 block p-6 border-b border-[var(--theme-border-light)]">
          <Typography variant="h4" className="text-theme-primary">
            Delivery Method
          </Typography>
          <Typography className="mt-1 font-normal text-theme-tertiary">
            Please select your preferred delivery method for your order.
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5 text-theme-secondary hover:text-theme-primary transition-colors"
            onClick={handleOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="mx-4 -mt-4">
          <Timeline>
            <TimelineItem>
              <TimelineConnector className="bg-[var(--theme-border-primary)]" />
              <TimelineHeader>
                <TimelineIcon className="p-2 bg-theme-gradient-primary">
                  <HomeIcon className="h-4 w-4 text-white" />
                </TimelineIcon>
                <Typography className="font-semibold text-theme-primary">
                  $2,400, Design Changes
                </Typography>
              </TimelineHeader>
              <TimelineBody className="-mt-2 pb-8">
                <Typography className="font-normal text-theme-tertiary">
                  22 Dec 6:20 PM
                </Typography>
              </TimelineBody>
            </TimelineItem>
            <TimelineItem>
              <TimelineConnector className="bg-[var(--theme-border-primary)]" />
              <TimelineHeader>
                <TimelineIcon className="p-2 bg-theme-gradient-secondary">
                  <BellIcon className="h-4 w-4 text-white" />
                </TimelineIcon>
                <Typography className="font-semibold text-theme-primary">
                  New order #1832412
                </Typography>
              </TimelineHeader>
              <TimelineBody className="-mt-2 pb-8">
                <Typography className="font-normal text-theme-tertiary">
                  21 Dec 8:20 PM
                </Typography>
              </TimelineBody>
            </TimelineItem>
            <TimelineItem>
              <TimelineConnector className="bg-[var(--theme-border-primary)]" />
              <TimelineHeader>
                <TimelineIcon className="p-2 bg-theme-gradient-accent">
                  <CurrencyDollarIcon className="h-4 w-4 text-white" />
                </TimelineIcon>
                <Typography className="font-semibold text-theme-primary">
                  Payment Completed
                </Typography>
              </TimelineHeader>
              <TimelineBody className="-mt-2">
                <Typography className="font-normal text-theme-tertiary">
                  17 Dec 4:20 PM
                </Typography>
              </TimelineBody>
            </TimelineItem>
          </Timeline>
        </DialogBody>
        <DialogFooter className="border-t border-[var(--theme-border-light)]">
          <Button 
            className="mr-auto bg-theme-gradient-primary text-white shadow-theme-sm hover-bubbly-sm" 
            onClick={handleOpen}
          >
            more details
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}