import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface UserActionDialogsProps {
  userToSuspend: string | null;
  userToActivate: string | null;
  onCloseSuspend: () => void;
  onCloseActivate: () => void;
  onToggleStatus: (userId: string, targetStatus: "ACTIVE" | "SUSPENDED") => void;
}

export function UserActionDialogs({
  userToSuspend,
  userToActivate,
  onCloseSuspend,
  onCloseActivate,
  onToggleStatus,
}: UserActionDialogsProps) {
  return (
    <>
      {/* Suspend Confirmation Dialog */}
      <Dialog open={userToSuspend !== null} onOpenChange={(open) => !open && onCloseSuspend()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Suspend User</DialogTitle>
            <DialogDescription className="text-[15px] mt-2">
              Are you sure you want to suspend this user? They will immediately lose access to their account and will not be able to log in.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-3">
            <Button variant="outline" className="cursor-pointer" onClick={onCloseSuspend}>Cancel</Button>
            <Button variant="destructive" className="cursor-pointer" onClick={() => {
              if (userToSuspend !== null) {
                onToggleStatus(userToSuspend, "SUSPENDED");
                onCloseSuspend();
              }
            }}>
              Suspend User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Activate Confirmation Dialog */}
      <Dialog open={userToActivate !== null} onOpenChange={(open) => !open && onCloseActivate()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Activate User</DialogTitle>
            <DialogDescription className="text-[15px] mt-2">
              Are you sure you want to activate this user? They will regain full access to their account and platform features.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-3">
            <Button variant="outline" className="cursor-pointer" onClick={onCloseActivate}>Cancel</Button>
            <Button className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => {
              if (userToActivate !== null) {
                onToggleStatus(userToActivate, "ACTIVE");
                onCloseActivate();
              }
            }}>
              Activate User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
