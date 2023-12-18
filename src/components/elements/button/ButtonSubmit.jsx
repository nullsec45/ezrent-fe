import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RotateCw } from 'lucide-react';
import PropTypes from 'prop-types';

export default function ButtonSubmit({ isSubmitting, text, className }) {
  return (
    <Button className={cn('', className)} disabled={isSubmitting}>
      {isSubmitting ? (
        <>
          <RotateCw className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        <>{text}</>
      )}
    </Button>
  );
}

ButtonSubmit.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};
